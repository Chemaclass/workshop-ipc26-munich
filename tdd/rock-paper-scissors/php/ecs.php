<?php

declare(strict_types=1);

use PhpCsFixer\Fixer\ArrayNotation\ArraySyntaxFixer;
use PhpCsFixer\Fixer\Strict\DeclareStrictTypesFixer;
use Symplify\EasyCodingStandard\Config\ECSConfig;
use Symplify\EasyCodingStandard\ValueObject\Set\SetList;

return static function (ECSConfig $ecsConfig): void {
    $ecsConfig->paths([
        __DIR__ . '/src',
        __DIR__ . '/tests',
        __DIR__ . '/ecs.php',
    ]);

    $ecsConfig->skip([]);

    $ecsConfig->sets([
        SetList::SPACES,
        SetList::ARRAY,
        SetList::DOCBLOCK,
        SetList::NAMESPACES,
        SetList::CONTROL_STRUCTURES,
        SetList::CLEAN_CODE,
        SetList::STRICT,
        SetList::PSR_12,
        SetList::PHPUNIT,
    ]);

    $ecsConfig->rule(DeclareStrictTypesFixer::class);

    $ecsConfig->ruleWithConfiguration(ArraySyntaxFixer::class, [
        'syntax' => 'short',
    ]);

    $ecsConfig->lineEnding("\n");
};
