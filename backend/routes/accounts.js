const express = require("express");
const { authMidleware } = require("../routes/middleware.js");
// const {User} = require("../db.js")
const { Account } = require("../db.js");

const router = express.Router();

router.get("/balance", authMidleware, async (req, res) => {
  const userId = req.userId;
console.log("Checking balance for userId:", userId);

  try {
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(400).json({
        msg: "Account does not exist",
      });
    }

    return res.status(200).json({
      msg: "Balance Successfully Fetched",
      Account: {
        balance: account.balance,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error in fetching balance",
      error: error.message,
    });
  }
});

router.post("/transfer", authMidleware, async (req, res) => {
  const { amount, to } = req.body;
  const userId = req.userId;

  const account = await Account.findOne({
    userId,
  });

  if (!account) {
    return res.status(400).json({
      msg: "Account does not exist",
    });
  }

  if (account.balance < amount) {
    return res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.status(400).json({
      msg: "Account to does not exist",
    });
  }

  //   const debitResult = await Account.updateOne(
  //     { userId },
  //     { $inc: { balance: -amount } }
  //   );
  //   console.log("Debit Result:", debitResult);

  //   const creditResult = await Account.updateOne(
  //     { userId: to },
  //     { $inc: { balance: amount } }
  //   );
  //   console.log("Credit Result:", creditResult);

//   console.log("Before Transfer:");
//   console.log("Sender balance:", account.balance);
//   console.log("Receiver balance:", toAccount.balance);

  await Account.updateOne({ userId }, { $inc: { balance: -amount } });
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  const updatedSender = await Account.findOne({ userId });
  const updatedReceiver = await Account.findOne({ userId: to });

//   console.log("After Transfer:");
//   console.log("Sender balance:", updatedSender.balance);
//   console.log("Receiver balance:", updatedReceiver.balance);

  return res.status(200).json({
    msg: "Transfer Successful",
    sender: updatedSender,
    receiver: updatedReceiver
  });

  // const session = await mongoose.startSession()

  // session.startTransaction()

  // const {amount, to} = req.body;
  // const userId = req.userId;

  // const account = await Account.findOne({
  //     userId
  // }).session(session)

  // if (!account || account.balance < amount) {
  //     await session.abortTransaction()
  //     return res.status(400).json({
  //         msg: "Insufficient balance",
  //     })
  // }

  // const toAccount = await Account.findOne({
  //     userId: to
  // }).session(session)

  // if (!toAccount) {
  //     await session.abortTransaction()
  //     return res.status(400).json({
  //         msg: "Account does not exist",
  //     })
  // }

  // await Account.updateOne({
  //     userId: userId
  // }, {
  //     $inc: {
  //         balance: -amount
  //     }
  // }).session(session)

  // await Account.updateOne({
  //     userId: to
  // }, {
  //     $inc: {
  //         balance: amount
  //     }
  // }).session(session)

  // await session.commitTransaction()

  // return res.status(200).json({
  //     msg: "Transfer Successful",
  // })
});

module.exports = router;
