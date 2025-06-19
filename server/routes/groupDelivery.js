import express from 'express';
import { groupDeliveryService } from '../index.js';

const router = express.Router();

// Join group delivery pool
router.post('/join', async (req, res) => {
  try {
    const result = await groupDeliveryService.joinGroupDelivery(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error joining group delivery:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get group delivery suggestions for a user
router.get('/suggestions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const suggestions = await groupDeliveryService.findGroupSuggestions(userId);
    res.json(suggestions);
  } catch (error) {
    console.error('Error getting group suggestions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm participation in a group delivery
router.post('/confirm', async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const result = await groupDeliveryService.confirmGroupDelivery(groupId, userId);
    res.json(result);
  } catch (error) {
    console.error('Error confirming group delivery:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get EcoCoin rewards and environmental impact
router.get('/rewards/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Mock rewards data - in production, this would come from user's transaction history
    const rewards = {
      totalEcoCoins: 450,
      co2Saved: '12.5 kg',
      groupDeliveries: 3,
      environmentalImpact: {
        treesEquivalent: 0.5,
        milesNotDriven: 25.3,
        energySaved: '15 kWh'
      }
    };
    res.json(rewards);
  } catch (error) {
    console.error('Error getting rewards:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get analytics dashboard data
router.get('/analytics', async (req, res) => {
  try {
    const analytics = groupDeliveryService.getAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Trigger manual clustering (for testing)
router.post('/cluster', async (req, res) => {
  try {
    await groupDeliveryService.performClustering();
    res.json({ message: 'Clustering completed successfully' });
  } catch (error) {
    console.error('Error performing clustering:', error);
    res.status(500).json({ error: error.message });
  }
});


export default router;
