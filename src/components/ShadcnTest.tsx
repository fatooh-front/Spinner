 import React from 'react';
import { Button } from './ui/button';

const ShadcnTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-8 max-w-md w-full border">
        <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
          🎉 shadcn/ui جاهز!
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          تم تثبيت shadcn/ui بنجاح مع Tailwind CSS v3 في مشروع TypeScript
        </p>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="default" size="sm">
              Default
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button variant="destructive" size="sm">
              Destructive
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button size="lg" className="w-full">
              زر كبير
            </Button>
            <Button variant="ghost" size="default">
              زر شفاف
            </Button>
            <Button variant="link" size="sm">
              رابط
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            ✅ تم التثبيت بنجاح:
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• React + TypeScript</li>
            <li>• Tailwind CSS v3.4.17</li>
            <li>• shadcn/ui components</li>
            <li>• CSS Variables for theming</li>
            <li>• Import aliases (@/components)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShadcnTest;
