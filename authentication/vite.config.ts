import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  if(command === 'serve'){
  return{
    server: {
      port: 5173, // Port for dev mode
    },
  };
  }else{
    return{
      plugins: [react()],
      base:'',
      build: {
        rollupOptions:{
        },
        server: {
          port: 8082,
        },
      }
    }
  }
});  

  


