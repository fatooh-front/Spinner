import React, { useState } from "react";
import NextFallbackImage from "../components/NextFallbackImage";

const UPLOAD_URL = "https://viganium.co/uploads";
const FIELD_NAME = "file";

type FileStatus = {
  name: string;
  status: "pending" | "ok" | "error";
  note?: string;
};

type UploadResponsePartial = {
  uploaded?: unknown[];
  files?: unknown[];
  count?: number;
};

export default function UploadMultiple() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<FileStatus[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    setFiles(picked);
    setLog(picked.map((f) => ({ name: f.name, status: "pending" })));
    setProgress(0);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append(FIELD_NAME, file);
      try {
        const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
        const raw = await res.text();
        console.log(`📩 [${file.name}] Response:`, raw);
        if (
          res.redirected ||
          res.type === "opaqueredirect" ||
          res.status === 301 ||
          res.status === 302
        ) {
          throw new Error(
            `Redirect (${res.status}) → قد يكون المسار غير صحيح أو يحتاج / في الآخر.`
          );
        }
        if (!res.ok) {
          throw new Error(raw || `HTTP ${res.status}`);
        }
        let json: unknown = null;
        try {
          json = JSON.parse(raw);
        } catch {
          // ignore non-JSON responses
        }
        const obj = (json || {}) as UploadResponsePartial;
        const uploadedCount =
          (obj.uploaded?.length ?? obj.files?.length ?? obj.count) || 1;
        setLog((prev) => {
          const copy = [...prev];
          copy[i] = {
            name: file.name,
            status: "ok",
            note: `تم رفعه (${uploadedCount})`,
          };
          return copy;
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : "فشل غير معروف";
        setLog((prev) => {
          const copy = [...prev];
          copy[i] = {
            name: file.name,
            status: "error",
            note: message,
          };
          return copy;
        });
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
  };

  return (
    <div
      style={{ maxWidth: 620, margin: "20px auto", fontFamily: "sans-serif" }}
    >
      <h2>رفع عدة ملفات</h2>
      <input type="file" multiple onChange={handleChange} />
      {files.length > 0 && (
        <ul style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {files.map((file, idx) => (
            <li
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {file.type.startsWith("image/") && (
                <NextFallbackImage
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={64}
                  height={64}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{file.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <div style={{ fontSize: 13 }}>
                {log[idx]?.status === "pending" && "جاهز"}
                {log[idx]?.status === "ok" && `✅ ${log[idx]?.note || "تم"}`}
                {log[idx]?.status === "error" && `❌ ${log[idx]?.note}`}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleUpload}
        style={{ display: "block", marginTop: 12 }}
      >
        رفع الملفات واحدًا تلو الآخر
      </button>
      {progress > 0 && (
        <div style={{ marginTop: 8 }}>التقدم الكلي: {progress}%</div>
      )}
    </div>
  );
}
