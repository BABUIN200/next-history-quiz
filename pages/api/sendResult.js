
import connect2db from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { test_id, result } = JSON.parse(req.body);
        await (await connect2db()).db
            .collection('mydb')
            .updateOne({ id: test_id }, { $push: { results: result } });
        res.status(200)
    }
}