import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";

import { TemplateFolder, PlaygroundData } from "../types";
import { getPlaygroundById, SaveUpdatedCode } from "../actions";

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(
    null
  );
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getPlaygroundById(id);
      if (!data) return;

      setPlaygroundData(data);

      const rawContent = data?.templateFiles?.[0]?.content;
      if (typeof rawContent === "string") {
        const parsedContent = JSON.parse(rawContent);
        setTemplateData(parsedContent);
        toast.success("Playground loaded successfully");
        return;
      }

      const res = await fetch(`/api/template/${id}`);
      if (!res.ok) {
        console.warn(`Template API failed with status ${res.status}, using default template`);
        // Fallback to default template structure
        setTemplateData({
          folderName: "Root",
          items: [
            {
              filename: "index",
              fileExtension: "js",
              content: "// Welcome to InulCode Playground!\nconsole.log('Hello World!');"
            },
            {
              filename: "README",
              fileExtension: "md",
              content: "# InulCode Playground\n\nStart coding here!"
            }
          ]
        });
        toast.success("Default template loaded");
        return;
      }

      const templateRes = await res.json();
      if (templateRes.success && templateRes.templateJson) {
        setTemplateData(templateRes.templateJson);
      } else {
        // Fallback to default template
        setTemplateData({
          folderName: "Root",
          items: [
            {
              filename: "index",
              fileExtension: "js",
              content: "// Welcome to InulCode Playground!\nconsole.log('Hello World!');"
            }
          ]
        });
      }

      toast.success("Template loaded successfully");
    } catch (error) {
      console.error("Error loading playground:", error);
      setError("Failed to load playground data");
      toast.error("Failed to load playground data");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const saveTemplateData = useCallback(
    async (data: TemplateFolder) => {
      try {
        await SaveUpdatedCode(id, data);
        setTemplateData(data);
        toast.success("Changes saved successfully");
      } catch (error) {
        console.error("Error saving template data:", error);
        toast.error("Failed to save changes");
        throw error;
      }
    },
    [id]
  );

  useEffect(() => {
    loadPlayground();
  }, [loadPlayground]);

  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  };
};
