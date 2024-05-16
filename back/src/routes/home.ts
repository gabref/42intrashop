import { Router } from "express";

const router = Router();

router.get('/', (_req, res) => {
	try {
		res.status(200).json({ message: 'Welcome to 42intrashop api' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
})

export { router };
