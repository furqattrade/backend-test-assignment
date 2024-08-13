import axios from 'axios';
import { Item } from '../interfaces/Item';
const SKINPORT_API_URL = 'https://api.skinport.com/v1/items';

export async function getItems() {
  const { data } = await axios.get(SKINPORT_API_URL, {
    params: {
      app_id: process.env.APP_ID || '730',
      currency: process.env.CURRENCY || 'EUR',
    },
  });
  return data.map((item: Item) => ({
    ...item,
    tradablePrice: item.min_price, 
    nonTradablePrice: item.max_price,
  }));
}
