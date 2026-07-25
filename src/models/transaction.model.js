const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      default: null,
      index: true,
    },

    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      default: null,
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ["DEPOSIT", "TRANSFER", "WITHDRAWAL"],
        message: "Transaction type must be DEPOSIT, TRANSFER or WITHDRAWAL",
      },
      default: "TRANSFER",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Status can be either PENDING, COMPLETED, FAILED or REVERSED",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "Account is required for creating a transaction"],
      min: [0.01, "Transaction amount must be greater than zero"],
    },
    idempotencyKey: {
      type: String,
      required: [
        true,
        "Idempotency Key is required for creating a transaction",
      ],
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;






// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     fromAccount: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "account",
//       default: null,
//       index: true,
//     },

//     toAccount: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "account",
//       default: null,
//       index: true,
//     },

//     type: {
//       type: String,
//       enum: {
//         values: ["DEPOSIT", "TRANSFER", "WITHDRAWAL"],
//         message:
//           "Transaction type must be DEPOSIT, TRANSFER or WITHDRAWAL",
//       },
//       default: "TRANSFER",
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: {
//         values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
//         message:
//           "Status can be either PENDING, COMPLETED, FAILED or REVERSED",
//       },
//       default: "PENDING",
//     },

//     amount: {
//       type: Number,
//       required: [true, "Amount is required for creating a transaction"],
//       min: [0.01, "Transaction amount must be greater than zero"],
//     },

//     idempotencyKey: {
//       type: String,
//       required: [
//         true,
//         "Idempotency Key is required for creating a transaction",
//       ],
//       unique: true,
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // Validate required accounts based on transaction type
// transactionSchema.pre("validate", function (next) {
//   switch (this.type) {
//     case "TRANSFER":
//       if (!this.fromAccount || !this.toAccount) {
//         return next(
//           new Error(
//             "TRANSFER transaction requires both fromAccount and toAccount",
//           ),
//         );
//       }

//       if (this.fromAccount.toString() === this.toAccount.toString()) {
//         return next(
//           new Error(
//             "fromAccount and toAccount cannot be the same account",
//           ),
//         );
//       }
//       break;

//     case "DEPOSIT":
//       if (!this.toAccount) {
//         return next(
//           new Error("DEPOSIT transaction requires toAccount"),
//         );
//       }
//       break;

//     case "WITHDRAWAL":
//       if (!this.fromAccount) {
//         return next(
//           new Error("WITHDRAWAL transaction requires fromAccount"),
//         );
//       }
//       break;
//   }

//   next();
// });

// const transactionModel = mongoose.model(
//   "transaction",
//   transactionSchema,
// );

// module.exports = transactionModel;