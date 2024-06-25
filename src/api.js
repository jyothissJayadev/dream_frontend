import axios from 'axios';

axios.defaults.baseURL = 'https://dream-backend-tiyk.onrender.com/';

export async function gettasks() {
    try {
        const response = await axios.get('/api/gettask');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return Promise.reject(error.message);
    }
}


export async function task(name) {
    try {
        const response = await axios.get(`/api/gettask/${name}`);
        console.log(response.data); // Log or process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return Promise.reject(error.message);
    }
}




export async function addtask(credentials) {
    console.log(credentials)
    const { name, units, endDate }=credentials;
      try {
        const response = await axios.post(`/api/addtask`, JSON.stringify({ name, units, endDate }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response
    
      } catch (error) {
              
          return Promise.reject(error);
              
      }
    }

    export async function editProgress(id, completedUnits) {
        try {
          const response = await axios.put(`/api/editProgress`, { id, completedUnits });
          return response.data.updatedTask;
        } catch (error) {
          throw new Error(error.response.data.error || 'Error updating progress');
        }
      }


      export const deleteTask = async (id) => {
        try {
          const response = await axios.delete(`/api/deletetask`, { data: { id } });
          return response.data;
        } catch (error) {
          console.error('Error deleting task:', error.message);
          throw error;
        }
      };