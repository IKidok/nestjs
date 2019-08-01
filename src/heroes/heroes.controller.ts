import {Controller, Get, Header, Param, Post, Req, Request, Body, Patch, Delete} from '@nestjs/common';
import {HeroesService} from './heroes.service';

@Controller('heroes')
export class HeroesController {
    constructor(private readonly heroesService: HeroesService) {}

    @Get()
    getAllHeroes() {
        return this.heroesService.getHeroes();
    }

    @Get(':id')
    getHero(@Param('id') heroId: string) {
        return this.heroesService.getHero(heroId);
    }

    @Post()
    createHero(
        @Body('name') heroName: string,
        @Body('age') heroAge: number,
        @Body('rating') heroRating: number,
    ): any {
        const generatedId =  this.heroesService.insertHero(
            heroName,
            heroAge,
            heroRating,
        );
        return { id: generatedId };
    }

    @Patch(':id')
    updateHero(
        @Param('id') heroId: string,
        @Body('name') heroName: string,
        @Body('age') heroAge: number,
        @Body('rating') heroRating: number,
    ) {
        this.heroesService.updateHero(heroId, heroName, heroAge, heroRating);
        return null;
    }

    @Delete(':id')
    deleteHero(@Param('id') heroId: string) {
        this.heroesService.deleteHero(heroId);
    }
}
