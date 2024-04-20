// import express,{Router} from "express";
// import  {getAddresses,getAddressById,deleteAddressById,editAddressById,createAddress} from '../controller/AddressController.js';
// const router = Router()

// // Route to create a new address
// router.post('/',createAddress);


// // Get all addresses
// router.get('/',getAddresses);

// // Get address by ID
// router.get('/:id',getAddressById);

// // Delete address by ID
// router.delete('/:id',deleteAddressById);

// // Update address by ID
// router.put('/:id', editAddressById);

// export default router;

import { Router } from "express";
import{create,getAll,getById,deleteById}  from '../controller/AddressController.js';

 const router = Router()

router.post('/create', create);
router.get('/getAll',getAll);
router.get('/getById/:id',getById);
router.delete('/:id',deleteById);

 export default router;