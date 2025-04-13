import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';

function averageOfField(array: any[], field: string): number | null {
  const total = array.reduce((sum, item) => sum + (item[field] ?? 0), 0);
  return array.length ? total / array.length : null;
}

function averageOfNestedField(array: any[], parentField: string): number | null {
  let total = 0;
  let count = 0;

  for (const item of array) {
    const nested = item[parentField];
    if (nested && typeof nested === 'object') {
      for (const key in nested) {
        const value = nested[key];
        if (typeof value === 'number') {
          total += value;
          count++;
        }
      }
    }
  }

  return count ? total / count : null;
}


@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const items = data.data;
        switch(data.part){
          case "current" : 
          return {
            sunrise: items.sunrise,
            sunset: items.sunset,
            temp: items.temp,
            feels_like: items.feels_like,
            pressure: items.pressure,
            humidity: items.humidity,
            uvi: items.uvi,
            wind_speed: items.wind_speed
          };
          case "daily" : 
          return {
            sunrise: averageOfField(items, "sunrise"),
            sunset: averageOfField(items, "sunset"),
            temp: averageOfNestedField(items, "temp"),
            feels_like: averageOfNestedField(items, "feels_like"),
            pressure: averageOfField(items, "pressure"),
            humidity: averageOfField(items, "humidity"),
            uvi: averageOfField(items, "uvi"),
            wind_speed: averageOfField(items, "wind_speed")
          }
          case "hourly" : 
          return {
            sunrise: averageOfField(items, "sunrise"),
            sunset: averageOfField(items, "sunset"),
            temp: averageOfField(items, "temp"),
            feels_like: averageOfField(items, "feels_like"),
            pressure: averageOfField(items, "pressure"),
            humidity: averageOfField(items, "humidity"),
            uvi: averageOfField(items, "uvi"),
            wind_speed: averageOfField(items, "wind_speed")
          }
          default: 
          return {
            message: "incorrect part"
          }
        }
        
      }),
    );
  }
}
