import express, { Request, Response } from 'express'
import supabase from 'utils/supabase-init'
const app = express()
const port = 3000

// Middleware to parse JSON in the request body
app.use(express.json())

// Routes
app.post('/devices', async (req: Request, res: Response) => {
  const { deviceId, deviceName } = req.body

  try {
    // Example: Save device information to a Supabase table
    const { data, error } = await supabase.from('devices').upsert([{ device_id: deviceId, device_name: deviceName }])

    if (error) {
      throw error
    }

    res.json({ success: true, message: `Device ${deviceName} registered successfully!`, data })
  } catch (error: any) {
    console.error('Error registering device:', error.message)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.get('/devices/:id', async (req: Request, res: Response) => {
  const { deviceId } = req.params

  try {
    // Example: Retrieve device data from a Supabase table
    const { data, error } = await supabase.from('devices').select('*').eq('device_id', deviceId)

    if (error) {
      throw error
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Error getting device data:', error.message)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.post('/devices/:id', async (req: Request, res: Response) => {
  const { deviceId } = req.params
  const { command } = req.body

  try {
    // Example: Send a command to the device (update a Supabase table)
    const { error } = await supabase.from('devices').update({ last_command: command }).eq('device_id', deviceId)

    if (error) {
      throw error
    }

    res.json({ success: true, message: `Command '${command}' sent to device ${deviceId}` })
  } catch (error: any) {
    console.error('Error sending command:', error.message)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// Export the Express app as a serverless function
export default app
