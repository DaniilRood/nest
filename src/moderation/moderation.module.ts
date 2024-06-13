import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { ModerationProcessor } from './moderation.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'moderation',
        }),
    ],
    controllers: [ModerationController],
    providers: [ModerationService, ModerationProcessor],
})
export class ModerationModule {}