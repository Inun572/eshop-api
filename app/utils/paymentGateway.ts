import { config } from 'dotenv';

config();

const PAYMENT_GATEWAY_URL = String(process.env.PAYMENT_GATEWAY_URL);

export const payment = async (paymentData: any) => {
  try {
    const response = await fetch(PAYMENT_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        cardNumber: paymentData.cardNumber,
        cvv: paymentData.cvv,
        expiryMonth: paymentData.expiryMonth,
        expiryYear: paymentData.expiryYear,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result);
    }

    return result;
  } catch (err) {
    return err;
  }
};
