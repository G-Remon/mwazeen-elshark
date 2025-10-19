import { useState, useEffect, useCallback } from 'react';

export const useProjectData = (id) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjectData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // استخدام dynamic import مع error handling
      const { projectsData } = await import('../data/ProjectData.js');
      const foundProject = projectsData.find(project => project.id === parseInt(id));

      if (!foundProject) {
        throw new Error('Project not found');
      }

      setProjectData(foundProject);
    } catch (err) {
      setError(err.message);
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      loadProjectData();
    }

    return () => {
      mounted = false;
    };
  }, [loadProjectData]);

  return { projectData, loading, error, retry: loadProjectData };
};