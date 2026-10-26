<?php

declare(strict_types=1);

namespace KataTests;

use Kata\Game;
use PHPUnit\Framework\TestCase;

final class ChangeMeTest extends TestCase
{
    public function testChangeMe(): void
    {
        $changeMe = new Game();

        self::assertTrue($changeMe->changeMe());
    }
}
