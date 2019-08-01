import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HeroesModule} from './heroes/heroes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      HeroesModule,
      MongooseModule.forRoot(
          'mongodb+srv://kidok:4zNfa3JL1MoYI8C3@tourofheroes-mehtw.mongodb.net/nestjs?retryWrites=true&w=majority',
          { useNewUrlParser: true },
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
