<?php
declare(strict_types=1);

// IpinfoDeveloper SDK exists test

require_once __DIR__ . '/../ipinfodeveloper_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IpinfoDeveloperSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
