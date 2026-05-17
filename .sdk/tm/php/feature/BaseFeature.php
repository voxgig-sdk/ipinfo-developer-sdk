<?php
declare(strict_types=1);

// IpinfoDeveloper SDK base feature

class IpinfoDeveloperBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpinfoDeveloperContext $ctx, array $options): void {}
    public function PostConstruct(IpinfoDeveloperContext $ctx): void {}
    public function PostConstructEntity(IpinfoDeveloperContext $ctx): void {}
    public function SetData(IpinfoDeveloperContext $ctx): void {}
    public function GetData(IpinfoDeveloperContext $ctx): void {}
    public function GetMatch(IpinfoDeveloperContext $ctx): void {}
    public function SetMatch(IpinfoDeveloperContext $ctx): void {}
    public function PrePoint(IpinfoDeveloperContext $ctx): void {}
    public function PreSpec(IpinfoDeveloperContext $ctx): void {}
    public function PreRequest(IpinfoDeveloperContext $ctx): void {}
    public function PreResponse(IpinfoDeveloperContext $ctx): void {}
    public function PreResult(IpinfoDeveloperContext $ctx): void {}
    public function PreDone(IpinfoDeveloperContext $ctx): void {}
    public function PreUnexpected(IpinfoDeveloperContext $ctx): void {}
}
