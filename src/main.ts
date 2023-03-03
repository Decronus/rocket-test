import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
 const PORT: number = Number(process.env.PORT) || 3000;
 const app: INestApplication = await NestFactory.create(AppModule);

 await app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
};

start();
