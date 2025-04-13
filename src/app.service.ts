import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { WeatherDto } from './weather.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @InjectRepository(Weather)
    private readonly repo: Repository<Weather>,
  ) {}

  async fetchAndStore(dto: WeatherDto) {
    try {
      const { lat, lon, part } = dto;
      const validParts = ["current", "daily", "hourly"];
      if (!validParts.includes(part as string)) {
        return {
          message: `${part} is not a valid parameter`
        }
      }
      const apiKey = this.config.get<string>('WEATHER_API_KEY');
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      let {data} = await this.http.axiosRef.get(url);
      const weather = this.repo.create({ lat, lon, part, data: data[part]});
      return this.repo.save(weather);
    }
    catch(e: unknown) {
      return {
        error: e
      };
    }
  }

  async getByParams(lat: number, lon: number, part?: string) {
    const result = await this.repo.findOneBy({ lat, lon, part });
    return result;
  }
  
}
