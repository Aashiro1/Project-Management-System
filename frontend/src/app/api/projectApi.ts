interface ProjectData {
  name: string;
  status: number; // Assuming status is a string (change if needed)
  start_date: string | null; // Dates should be pre-formatted before assignment
  end_date: string | null;
  description: string;
  manager_id: number;
  user_ids: number; // Assuming manager_id is a number (change if needed)

}
export async function createProject(projectData: ProjectData) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/projects/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });

        console.log("Response Status:", response.status);
        const responseBody = await response.json();
        console.log("Response Body:", responseBody); // Log the actual response

        if (!response.ok) {
            // Show the actual error message from the response, if available
            const errorMessage = `Failed to create project: ${JSON.stringify(responseBody, null, 2)}`;
            throw new Error(errorMessage);
        }

        return responseBody;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}
