import Messages from '../model/messageModel.js'

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message Added successfully" });
    else return res.json({ msg: "Failed to add the Message" });
  } catch (err) {
    next(err);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const {from,to}=req.body;
    console.log(req.body)
    const messages = await Messages.find({users:{
        $all:[from,to],
    }}).sort({updatedAt:1});
    console.log(messages)
    const projectMessages=messages.map((msg)=>{
        return {
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text,
        }
    })
    console.log(projectMessages)
    return res.json(projectMessages)
  } catch (err) {
    next(err);
  }
};
