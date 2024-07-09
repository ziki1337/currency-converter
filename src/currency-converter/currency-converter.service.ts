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
}
