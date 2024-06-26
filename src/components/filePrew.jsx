export const getFileFromIndexedDB = () => {
    const fileName = sessionStorage.getItem("UploadedFileName")


    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('filesDB', 2);

      request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction('files', 'readonly');
        const store = transaction.objectStore('files');
        const getRequest = store.get(fileName);

        getRequest.onsuccess = () => {
          const fileData = getRequest.result;
          if (fileData) {

            let base64Content;
            let mimeType;
            if (fileData.content.startsWith('data:application/pdf;base64,')) {
              base64Content = fileData.content.replace(/^data:application\/pdf;base64,/, '');
              mimeType = 'application/pdf';
            } else if (fileData.content.startsWith('data:image/png;base64,')) {
              base64Content = fileData.content.replace(/^data:image\/png;base64,/, '');
              mimeType = 'image/png';
            } else if (fileData.content.startsWith('data:image/jpeg;base64,')) {
              base64Content = fileData.content.replace(/^data:image\/jpeg;base64,/, '');
              mimeType = 'image/jpeg';
            } else {
              return reject(new Error('Unsupported file format'));
            }


            const cleanedContent = base64Content.replace(/\s/g, '');

            try {

              const binaryString = window.atob(cleanedContent);

              const byteArray = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                byteArray[i] = binaryString.charCodeAt(i);
              }

              const blob = new Blob([byteArray], { type: mimeType });
              const url = window.URL.createObjectURL(blob);

              // Create an element to preview the file based on its type 
              const newTab = window.open();
              if (!newTab) {
                return reject(new Error('Failed to open new tab'));
              }

              newTab.document.open();
              if (mimeType === 'application/pdf') {
                newTab.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>${fileName}</title>
                  <style>
                    html, body {
                      height: 100%;
                      margin: 0;
                    }
                    iframe {
                      width: 100%;
                      height: 100%;
                      border: none;
                    }
                  </style>
                </head>
                <body>
                  <iframe src="${url}"></iframe>
                </body>
                </html>
              `);
              } else if (mimeType === 'image/png' || mimeType === 'image/jpeg') {
                newTab.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>${fileName}</title>
                  <style>
                    html, body {
                      height: 100%;
                      margin: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background-color: #f0f0f0;
                    }
                    img {
                      max-width: 100%;
                      max-height: 100%;
                    }
                  </style>
                </head>
                <body>
                  <img src="${url}" alt="${fileName}">
                </body>
                </html>
              `);
              } else {
                return reject(new Error('Unsupported file format'));
              }
              newTab.document.close();

              resolve();

              // // Dowload file

              // const link = document.createElement('a');
              // link.href = url;
              // link.download = fileName;
              // link.click();
              // resolve(); 
            } catch (error) {
              console.error('Error decoding base64 content:', error);
              reject(new Error('Error decoding base64 content'));
            }
          } else {
            reject(new Error('File not found in IndexedDB'));
          }
        };

        getRequest.onerror = () => {
          console.error('Error fetching file from IndexedDB:', getRequest.error);
          reject(new Error('Error fetching file from IndexedDB'));
        };
      };

      request.onerror = event => {
        reject(new Error('Error opening database:', event));
      };
    });
  };