import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios'; // для отслеживания курса с внешних API
import * as fx from 'money'; //для работы с преобразованием валют

@Injectable()
export class CurrencyConverterService implements OnModuleInit {
  private apiKey = '5d8a5c03eff0bbe66e8f257b'; 
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/EUR`;

  async onModuleInit() 
  {
    await this.loadExchangeRates();
  }

  async loadExchangeRates() {
    try 
    {
      const response = await axios.get(this.apiUrl);
      const rates = response.data.conversion_rates;

      if (!fx.rates) fx.rates = {};
      if (!fx.base) fx.base = 'EUR'; // Базовая валюта
      
      fx.rates = rates; // Обновляем курсы валют в money.js
    } 
    catch (error) 
    {
      console.error(`Не получается получить обменный курс: ${error.message}`);
    }
  }

  async findAllValues(num: number, preCurr: string, postCurr: string): Promise<number> {
    try 
    {
      if (!fx.rates || Object.keys(fx.rates).length === 0) 
      {
        await this.loadExchangeRates();
      }

      // Прямое преобразование валют
      const preRate = fx.rates[preCurr];
      const postRate = fx.rates[postCurr];

      if (!preRate || !postRate) 
      {
        throw new Error(`Отсутствует обменный курс для ${preCurr} или ${postCurr}`);
      }

      const result = (num / preRate) * postRate;
      return result;
    } 
    catch (error) 
    {
      console.error('Error:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }

  async calculatorCurr(num1: number, firstCurr: string, num2: number, secondCurr: string, finalCurr: string, operation:string): Promise<any> {
    try
    {
      if (!fx.rates || Object.keys(fx.rates).length === 0) 
        {
          await this.loadExchangeRates();
        }
      
      fx.base = 'EUR';
      const baseRate = fx.rates[fx.base]
      const firstRate = fx.rates[firstCurr];
      const secondRate = fx.rates[secondCurr];
      const finalRate = fx.rates[finalCurr];

      if (!firstRate || !secondRate || !finalRate) 
        {
          throw new Error(`Отсутствует обменный курс для ${firstRate} или ${secondRate} или ${finalRate}`);
        }

      
      const firstResult = (num1 / firstRate) * baseRate;
      const secondResult = (num2/ secondRate) * baseRate;
      //const result = ((firstResult + secondResult) / baseRate) * finalRate;
      let preResult: number;
      switch(operation)
      {
        case '+':
          preResult = firstResult + secondResult;
          break;
        case '-':
          preResult = firstResult - secondResult;
          break;
        case '*':
          preResult = firstResult * secondResult;
          break;
        case '/':
          if (secondResult === 0) 
          {
            throw new Error('Division by zero is not allowed.');
          }
          preResult = firstResult / secondResult;
          break;
        default:
          throw new Error('Invalid operator.');
      }

      const result = (preResult / baseRate) * finalRate;
      return result;

    }
    catch (error)
    {
      console.error('Error:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
