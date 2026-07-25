// const transactionModel = require("../models/transaction.model");
// const ledgerModel = require("../models/ledger.model");
// const accountModel = require("../models/account.model");
// const emailService = require("../services/email.service");
// const mongoose = require("mongoose");

// async function createTransaction(req, res) {
//   const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

//   if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
//     return res.status(400).json({
//       message: "fromAccount, toAccount, amount and idempotencyKey are required",
//     });
//   }

//   if (typeof amount !== "number" || amount <= 0) {
//     return res.status(400).json({
//       message: "Amount must be greater than 0",
//     });
//   }

//   if (fromAccount === toAccount) {
//     return res.status(400).json({
//       message: "Cannot transfer money to the same account",
//     });
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const fromUserAccount = await accountModel
//       .findById(fromAccount)
//       .session(session);

//     const toUserAccount = await accountModel
//       .findById(toAccount)
//       .session(session);

//     if (!fromUserAccount || !toUserAccount) {
//       throw new Error("Invalid fromAccount or toAccount");
//     }

//     // Authorization (change .user to .owner if needed)
//     if (fromUserAccount.user.toString() !== req.user._id.toString()) {
//       await session.abortTransaction();

//       return res.status(403).json({
//         message: "You are not authorized to use this account",
//       });
//     }

//     const existingTransaction = await transactionModel
//       .findOne({ idempotencyKey })
//       .session(session);

//     if (existingTransaction) {
//       await session.abortTransaction();

//       if (existingTransaction.status === "COMPLETED") {
//         return res.status(200).json({
//           message: "Transaction already processed",
//           transaction: existingTransaction,
//         });
//       }

//       if (existingTransaction.status === "PENDING") {
//         return res.status(200).json({
//           message: "Transaction is still processing",
//         });
//       }

//       if (existingTransaction.status === "FAILED") {
//         return res.status(409).json({
//           message: "Previous transaction failed. Please retry.",
//         });
//       }

//       if (existingTransaction.status === "REVERSED") {
//         return res.status(409).json({
//           message: "Transaction was reversed. Please retry.",
//         });
//       }
//     }

//     if (
//       fromUserAccount.status !== "ACTIVE" ||
//       toUserAccount.status !== "ACTIVE"
//     ) {
//       throw new Error("Both accounts must be ACTIVE");
//     }

//     // Assumes getBalance() calculates balance from ledger
//     const balance = await fromUserAccount.getBalance();

//     if (balance < amount) {
//       throw new Error(`Insufficient balance. Current balance: ${balance}`);
//     }

//     const transaction = (
//       await transactionModel.create(
//         [
//           {
//             fromAccount,
//             toAccount,
//             amount,
//             idempotencyKey,
//             status: "PENDING",
//           },
//         ],
//         { session },
//       )
//     )[0];

//     await transaction.save({ session });

//     await ledgerModel.create(
//       [
//         {
//           account: fromAccount,
//           transaction: transaction._id,
//           amount,
//           type: "DEBIT",
//         },
//       ],
//       { session },
//     );

//     await ledgerModel.create(
//       [
//         {
//           account: toAccount,
//           transaction: transaction._id,
//           amount,
//           type: "CREDIT",
//         },
//       ],
//       { session },
//     );

//     transaction.status = "COMPLETED";
//     await transaction.save({ session });

//     await session.commitTransaction();

//     // Email should not affect transaction
//     try {
//       await emailService.sendTransactionEmail(
//         req.user.email,
//         req.user.name,
//         amount,
//         toAccount,
//       );
//     } catch (emailError) {
//       console.error("Email Error:", emailError.message);
//     }

//     return res.status(201).json({
//       message: "Transaction completed successfully",
//       transaction,
//     });
//   } catch (error) {
//     await session.abortTransaction();

//     return res.status(500).json({
//       message: error.message || "Transaction failed",
//     });
//   } finally {
//     session.endSession();
//   }
// }
// async function createInitialFundsTransaction(req, res) {
//   const { toAccount, amount, idempotencyKey } = req.body;

//   if (!toAccount || !amount || !idempotencyKey) {
//     return res.status(401).json({
//       message: "toAccount, amount and idempotencyKey are required",
//     });
//   }

//   const toUserAccount = await accountModel.findOne({
//     _id: toAccount,
//   });
//   if (!toUserAccount) {
//     return res.status(400).json({
//       message: "Invalid toAccount",
//     });
//   }

//   const formUserAccount = await accountModel.findOne({
//     user: req.user._id,
//   });

//   if (!formUserAccount) {
//     return res.status(400).json({
//       message: "System user account not found",
//     });
//   }
//   const fromBalance = await formUserAccount.getBalance();
//   const toBalance = await toUserAccount.getBalance();

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   const transaction = new transactionModel({
//     fromAccount,
//     toAccount,
//     amount,
//     idempotencyKey,
//     status: "PENDING",
//   });

//   const debitLedgerEntry = await ledgerModel.create(
//     [
//       {
//         account: formUserAccount._id,
//         transaction: transaction._id,
//         amount: amount,
//         type: "DEBIT",
//         balanceBeforeTransaction: fromBalance,
//         balanceAfterTransaction: fromBalance - amount,
//       },
//     ],
//     { session },
//   );

//   await (() => {
//     return new Promise((resolve) => setTimeout(resolve, 100 * 1000));
//   })();

//   const creditLedgerEntry = await ledgerModel.create(
//     [
//       {
//         account: toAccount,
//         amount: amount,
//         transaction: transaction._id,
//         type: "CREDIT",
//         balanceBeforeTransaction: toBalance,
//         balanceAfterTransaction: toBalance + amount,
//       },
//     ],
//     { session },
//   );

//   // transaction.status = "COMPLETED";
//   // await transaction.save({ session });

//   await transactionModel.findOneAndUpdate(
//     { _id: transaction._id },
//     { status: "COMPLETED" },
//     { session },
//   );

//   await session.commitTransaction();
//   session.endSession();

//   return res.status(201).json({
//     message: "Initial funds transaction completed successful",
//     transaction: transaction,
//   });
// }
// module.exports = {
//   createTransaction,
//   createInitialFundsTransaction,
// };









const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../services/email.service")
const mongoose = require("mongoose")

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
     * 1. Validate request
     * 2. Validate idempotency key
     * 3. Check account status
     * 4. Derive sender balance from ledger
     * 5. Create transaction (PENDING)
     * 6. Create DEBIT ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transaction COMPLETED
     * 9. Commit MongoDB session
     * 10. Send email notification
 */

async function createTransaction(req, res) {

    /**
     * 1. Validate request
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    /**
     * 2. Validate idempotency key
     */

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        }

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }

    /**
     * 3. Check account status
     */

    if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    /**
     * 4. Derive sender balance from ledger
     */
    const balance = await fromUserAccount.getBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }

    let transaction;
    try {


        /**
         * 5. Create transaction (PENDING)
         */
        const session = await mongoose.startSession()
        session.startTransaction()

        transaction = (await transactionModel.create([ {
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        } ], { session }))[ 0 ]

        const debitLedgerEntry = await ledgerModel.create([ {
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        } ], { session })

        await (() => {
            return new Promise((resolve) => setTimeout(resolve, 15 * 1000));
        })()

        const creditLedgerEntry = await ledgerModel.create([ {
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        } ], { session })

        await transactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETED" },
            { session }
        )


        await session.commitTransaction()
        session.endSession()
    } catch (error) {

        return res.status(400).json({
            message: "Transaction is Pending due to some issue, please retry after sometime",
        })

    }
    /**
     * 10. Send email notification
     */
    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })

}

async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }


    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })

    const debitLedgerEntry = await ledgerModel.create([ {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    } ], { session })

    const creditLedgerEntry = await ledgerModel.create([ {
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    } ], { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "Initial funds transaction completed successfully",
        transaction: transaction
    })


}

module.exports = {
    createTransaction,
    createInitialFundsTransaction
}