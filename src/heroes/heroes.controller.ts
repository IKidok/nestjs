import {Controller, Get, Header, Param, Post, Req, Request, Body, Patch, Delete} from '@nestjs/common';
import {HeroesService} from './heroes.service';

@Controller('heroes')
export class HeroesController {
    constructor(private readonly heroesService: HeroesService) {}

    @Get()
    async getAllHeroes() {
        const heroes = await this.heroesService.getHeroes();
        return heroes;
    }

    @Get(':id')
    getHero(@Param('id') heroId: string) {
        return this.heroesService.getHero(heroId);
    }

    @Post()
    async createHero(
        @Body('name') heroName: string,
        @Body('age') heroAge: number,
        @Body('rating') heroRating: number,
    ) {
        const generatedId = await this.heroesService.insertHero(
            heroName,
            heroAge,
            heroRating,
        );
        return { id: generatedId };
    }

    @Patch(':id')
    async updateHero(
        @Param('id') heroId: string,
        @Body('name') heroName: string,
        @Body('age') heroAge: number,
        @Body('rating') heroRating: number,
    ) {
        await this.heroesService.updateHero(heroId, heroName, heroAge, heroRating);
        return null;
    }

    @Delete(':id')
    async deleteHero(@Param('id') heroId: string) {
        await this.heroesService.deleteHero(heroId);
    }
}
