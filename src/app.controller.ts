import { Controller, Get, Post, Body, UseInterceptors, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherDto } from './weather.dto';
import { FormatInterceptor } from './format/format.interceptor';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  create(@Body() dto: WeatherDto) {
    return this.service.fetchAndStore(dto);
  }

  @Get()
  @UseInterceptors(FormatInterceptor)
  find(@Query() query: WeatherDto) {
    return this.service.getByParams(query.lat, query.lon, query.part);
  }
  
}
