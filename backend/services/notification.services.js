class NotificationService {

    async mostBoughtProducts(){
  const scriptPath = path.join(__dirname, 'ml', 'most_bought.py');
  console.log(`Executing script: python ${scriptPath}`);

  // Spawn the child process. This script doesn't require any arguments
  // unless you want to change the default limit (e.g., ['20'] for top 20).
  const pythonProcess = spawn('python', [scriptPath]);

  let resultJsonString = '';
  let error = '';

  // Step A: Capture the output string from the Python script.
  // The 'resultJsonString' variable will accumulate the data printed by Python.
  pythonProcess.stdout.on('data', (data) => {
    resultJsonString += data.toString();
  });

  // Capture any potential errors.
  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  // Step B: When the script finishes, process the captured string.
  pythonProcess.on('close', (code) => {
    console.log(`Python script (most_bought) exited with code ${code}`);

    if (error) {
      console.error('[Python Error]:', error);
      return res.status(500).json({ error: 'An error occurred in the analysis script.', details: error });
    }

    // Step C: Parse the JSON string and send it to the client.
    // This is the "export" to the controller. The controller now has the data.
    try {
      const analysisResult = JSON.parse(resultJsonString);
      res.status(200).json(analysisResult);
    } catch (e) {
      console.error('Failed to parse JSON from Python:', resultJsonString);
      res.status(500).json({ error: 'The analysis script returned an invalid format.', details: resultJsonString });
    }
  })
    }
    async recommendProducts(productName, weatherCondition){

  const scriptPath = path.join(__dirname, 'ml-models','analysis', 'predict.py');
  const pythonProcess = spawn('python', [scriptPath, productName, weatherCondition]);

  let result = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (error) {
      console.error('[Python Error]:', error);
      return res.status(500).json({ error: 'An error occurred in the prediction script.', details: error });
    }
    try {
      const prediction = JSON.parse(result);
      res.status(200).json(prediction);
    } catch (e) {
      res.status(500).json({ error: 'The script returned an invalid format.', details: result });
    }
  });
  }
}