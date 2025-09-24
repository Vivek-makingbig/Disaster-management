const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    name: 
    {
       type: String, 
       required: true
    },
    item: 
    {
       type: String,
        required: true 
      },
    quantity:
     { 
      type: Number,
       required: true 
      },
  },
  {
     timestamps: true
     } // adds createdAt
);

module.exports= mongoose.model("Order", orderSchema);
