exports.chatResponse = async (req, res, next) => {     
    const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: req.body.message,
            },
          ],
        }),
      }
      try {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          options
        )
        const data = await response.json()
        res.send(data)
      } catch (error) {
        return next(error);
      }
    }