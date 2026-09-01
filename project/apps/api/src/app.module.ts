import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticesModule } from './notices/notices.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicsModule } from './topics/topics.module';
import { QuestionsModule } from './questions/questions.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'apps/api/.env'),
        join(__dirname, '../.env'),
      ],
    }),
    PrismaModule,
    AuthModule,
    NoticesModule,
    SubjectsModule,
    TopicsModule,
    QuestionsModule,
    FlashcardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
