import { Router } from "express";

const router = Router();

router.get('/status', (_req, res) => {
	try {
		res.status(200).json({ message: 'working fine' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
})

export { router };
