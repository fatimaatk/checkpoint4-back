import express from 'express';
import favorisModel from '../models/favorisModel.js';
const router = express.Router(); 


router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
      const allFavorisFromUser = await favorisModel.getOneById(id)
       res.send(allFavorisFromUser);
    } catch (error) {
        res.status(500).send('Error server, try again !')
    }
 });

router.delete('/:id', async (req, res) => {
  const favid = req.params.id;
  try {
    const favoris = await favorisModel.deleteById(favid)
     res.send(`Le produit a bien été supprimé.`);
  } catch (error) {
      res.status(500).send('Error server, try again !')
  }
});

router.post('/:id', async (req, res) => {
  const {product_id, user_id} = req.body;
  try {
      const lastInsertId = await favorisModel.createNewFavoris(product_id, user_id)
      if(lastInsertId) {
        const newFavoris = await favorisModel.getOneById(lastInsertId)
        res.json('Le produit a bien été ajouté à vos favoris.')
      }
      else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });



export default router;