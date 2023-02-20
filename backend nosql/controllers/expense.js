const User = require('../models/user');

exports.addexpense = async(req,res,next)=>{
    const amount = req.body.amount;
    const category = req.body.category;
    const description = req.body.description;
    const _id = req.user._id;
  const user = await User.findById({_id});
  user.totalexpense = user.totalexpense + amount;
  await user.save({validateBeforeSave :false});
 
  user.expenses.push({amount , category , description});
  await user.save({validateBeforeSave : false });
 
  res.status(201).json({success:"done"});
}

exports.getexpense = async(req,res,next)=>{
    const _id = req.user._id;
    const page = +req.query.page || 1;
    const itemsperpage = +req.query.itemsperpage;
    console.log(page , itemsperpage);
    const user = await User.findById({_id});
    const array = user.expenses;
    const totalItems = array.length;
    const products = array.slice(((page -1) *itemsperpage) , ((page - 1) * itemsperpage) + itemsperpage );
    res.status(200).json({
        products : products,
        currentPage : page,
        hasNextPage : (itemsperpage)* page < totalItems,
        nextPage : page + 1,
        hasPreviousPage : page > 1,
        previousPage : page -1,
        lastPage : Math.ceil(totalItems / (itemsperpage)),
    });
}


