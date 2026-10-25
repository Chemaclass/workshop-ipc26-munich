<?php

declare(strict_types=1);

namespace KataTests;

use Kata\ChangeMe;
use PHPUnit\Framework\TestCase;

final class ChangeMeTest extends TestCase
{
    public function testChangeMe(): void
    {
        $changeMe = new ChangeMe();

        self::assertTrue($changeMe->changeMe());
    }
}
