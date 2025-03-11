export interface ProjectData {
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
    manager_id?: string;
    user_ids?: string[];
  }
  
  export async function createProject(projectData: ProjectData): Promise<ProjectData> {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }
  