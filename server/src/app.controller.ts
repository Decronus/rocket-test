import {Controller, Query, Get} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/')
export class AppController {

    constructor(private appService: AppService) {}

    @Get('/')
    getLeads(@Query('query') query: string) {
        return this.appService.getMainData(query)
    }
}
