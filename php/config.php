<?php
declare(strict_types=1);

// IpinfoDeveloper SDK configuration

class IpinfoDeveloperConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IpinfoDeveloper",
                "slug" => "ipinfo-developer",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://ipinfo.io/",
                "auth" => [
                    "prefix" => "Basic",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "abuse" => [],
                    "asn" => [],
                    "carrier" => [],
                    "company" => [],
                    "core" => [],
                    "domain" => [],
                    "general" => [],
                    "get_current_information" => [],
                    "get_information_by_ip" => [],
                    "ipinfo_core" => [],
                    "ipinfo_lite" => [],
                    "ipinfo_plus" => [],
                    "lite" => [],
                    "max" => [],
                    "men" => [],
                    "place" => [],
                    "plus" => [],
                    "privacy" => [],
                    "privacy_extended" => [],
                    "range" => [],
                    "residential_proxy" => [],
                    "single" => [],
                    "whois_asn" => [],
                    "whois_domain" => [],
                    "whois_ip" => [],
                    "whois_net_id" => [],
                    "whois_org" => [],
                    "whois_poc" => [],
                ],
            ],
            "entity" => [
        'abuse' => [
          'fields' => [
            [
              'name' => 'address',
              'title' => 'Address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'network',
              'title' => 'Network',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'title' => 'Phone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'abuse',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/abuse',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'abuse',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'abuse',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'asn' => [
          'fields' => [
            [
              'name' => 'allocated',
              'title' => 'Allocated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'asn',
              'title' => 'Asn',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'downstreams',
              'title' => 'Downstreams',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'num_ips',
              'title' => 'Num Ips',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'peers',
              'title' => 'Peers',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'prefixes',
              'title' => 'Prefixes',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'prefixes6',
              'title' => 'Prefixes6',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'registry',
              'title' => 'Registry',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'route',
              'title' => 'Route',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'upstreams',
              'title' => 'Upstreams',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'asn',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/AS{asn}',
                  'segments' => [
                    [
                      'lit' => 'AS{asn}',
                    ],
                  ],
                  'parts' => [
                    'AS{asn}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'asn',
                        'orig' => 'asn',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'asn',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'carrier' => [
          'fields' => [
            [
              'name' => 'mcc',
              'title' => 'Mcc',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'mnc',
              'title' => 'Mnc',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'carrier',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/carrier',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'carrier',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'carrier',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'company' => [
          'fields' => [
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'company',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/company',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'company',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'company',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'core' => [
          'fields' => [
            [
              'name' => 'as',
              'title' => 'As',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'geo',
              'title' => 'Geo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'hostname',
              'title' => 'Hostname',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'is_anonymous',
              'title' => 'Is Anonymous',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_anycast',
              'title' => 'Is Anycast',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_hosting',
              'title' => 'Is Hosting',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_mobile',
              'title' => 'Is Mobile',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_satellite',
              'title' => 'Is Satellite',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'core',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/{ip}',
                  'segments' => [
                    [
                      'lit' => 'lookup',
                    ],
                    [
                      'var' => 'ip',
                    ],
                  ],
                  'parts' => [
                    'lookup',
                    '{ip}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/me',
                  'segments' => [
                    [
                      'lit' => 'lookup',
                    ],
                    [
                      'lit' => 'me',
                    ],
                  ],
                  'parts' => [
                    'lookup',
                    'me',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'domain' => [
          'fields' => [
            [
              'name' => 'domains',
              'title' => 'Domains',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'domain',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/domains/{ip}',
                  'segments' => [
                    [
                      'lit' => 'domains',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'domains',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 100,
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'limit',
                      'page',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'general' => [
          'fields' => [
            [
              'name' => '8_8_8_8',
              'title' => '8 8 8 8',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => '8_8_8_8city',
              'title' => '8 8 8 8city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'summary',
              'title' => 'Summary',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'general',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/tools/map',
                  'segments' => [
                    [
                      'lit' => 'tools',
                    ],
                    [
                      'lit' => 'map',
                    ],
                  ],
                  'parts' => [
                    'tools',
                    'map',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'cli',
                        'orig' => 'cli',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'cli',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/tools/summarize-ips',
                  'segments' => [
                    [
                      'lit' => 'tools',
                    ],
                    [
                      'lit' => 'summarize-ips',
                    ],
                  ],
                  'parts' => [
                    'tools',
                    'summarize-ips',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'cli',
                        'orig' => 'cli',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'cli',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/batch',
                  'segments' => [
                    [
                      'lit' => 'batch',
                    ],
                  ],
                  'parts' => [
                    'batch',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_current_information' => [
          'fields' => [
            [
              'name' => 'asn',
              'title' => 'Asn',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'bogon',
              'title' => 'Bogon',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'carrier',
              'title' => 'Carrier',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company',
              'title' => 'Company',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domains',
              'title' => 'Domains',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'hostname',
              'title' => 'Hostname',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'loc',
              'title' => 'Loc',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'org',
              'title' => 'Org',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postal',
              'title' => 'Postal',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'privacy',
              'title' => 'Privacy',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timezone',
              'title' => 'Timezone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_current_information',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'segments' => [],
                  'parts' => [],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_information_by_ip' => [
          'fields' => [
            [
              'name' => 'asn',
              'title' => 'Asn',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'bogon',
              'title' => 'Bogon',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'carrier',
              'title' => 'Carrier',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company',
              'title' => 'Company',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domains',
              'title' => 'Domains',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'hostname',
              'title' => 'Hostname',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'loc',
              'title' => 'Loc',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'org',
              'title' => 'Org',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postal',
              'title' => 'Postal',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'privacy',
              'title' => 'Privacy',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timezone',
              'title' => 'Timezone',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'get_information_by_ip',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}',
                  'segments' => [
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ipinfo_core' => [
          'fields' => [
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'ip',
              'field',
            ],
            'sep' => '/',
          ],
          'name' => 'ipinfo_core',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/{ip}/{field}',
                  'segments' => [
                    [
                      'lit' => 'lookup',
                    ],
                    [
                      'var' => 'ip',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'lookup',
                    '{ip}',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/me/{field}',
                  'segments' => [
                    [
                      'lit' => 'lookup',
                    ],
                    [
                      'lit' => 'me',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'lookup',
                    'me',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ipinfo_lite' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'ipinfo_lite',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lite/{ip}/{field}',
                  'segments' => [
                    [
                      'lit' => 'lite',
                    ],
                    [
                      'var' => 'ip',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'lite',
                    '{ip}',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lite/me/{field}',
                  'segments' => [
                    [
                      'lit' => 'lite',
                    ],
                    [
                      'lit' => 'me',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'lite',
                    'me',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lite/{ip}',
                  'segments' => [
                    [
                      'lit' => 'lite',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'lite',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.lite',
              ],
            ],
          ],
        ],
        'ipinfo_plus' => [
          'fields' => [
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'ip',
              'field',
            ],
            'sep' => '/',
          ],
          'name' => 'ipinfo_plus',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/plus/{ip}/{field}',
                  'segments' => [
                    [
                      'lit' => 'plus',
                    ],
                    [
                      'var' => 'ip',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'plus',
                    '{ip}',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/plus/me/{field}',
                  'segments' => [
                    [
                      'lit' => 'plus',
                    ],
                    [
                      'lit' => 'me',
                    ],
                    [
                      'var' => 'field',
                    ],
                  ],
                  'parts' => [
                    'plus',
                    'me',
                    '{field}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.plus',
              ],
            ],
          ],
        ],
        'lite' => [
          'fields' => [],
          'name' => 'lite',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lite/me',
                  'segments' => [
                    [
                      'lit' => 'lite',
                    ],
                    [
                      'lit' => 'me',
                    ],
                  ],
                  'parts' => [
                    'lite',
                    'me',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [
                    '$action' => 'me',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'max' => [
          'fields' => [
            [
              'name' => 'anonymous',
              'title' => 'Anonymous',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'as',
              'title' => 'As',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'geo',
              'title' => 'Geo',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'hostname',
              'title' => 'Hostname',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'is_anonymous',
              'title' => 'Is Anonymous',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_anycast',
              'title' => 'Is Anycast',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_hosting',
              'title' => 'Is Hosting',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_mobile',
              'title' => 'Is Mobile',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_satellite',
              'title' => 'Is Satellite',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'mobile',
              'title' => 'Mobile',
              'type' => '`$OBJECT`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'max',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/max/{ip}',
                  'segments' => [
                    [
                      'lit' => 'max',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'max',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'men' => [
          'fields' => [
            [
              'name' => 'features',
              'title' => 'Features',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'requests',
              'title' => 'Requests',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'men',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/me',
                  'segments' => [
                    [
                      'lit' => 'me',
                    ],
                  ],
                  'parts' => [
                    'me',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'place' => [
          'fields' => [
            [
              'name' => 'category',
              'title' => 'Category',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'latitude',
              'title' => 'Latitude',
              'type' => '`$NUMBER`',
              'req' => true,
            ],
            [
              'name' => 'longitude',
              'title' => 'Longitude',
              'type' => '`$NUMBER`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'ssid',
              'title' => 'Ssid',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'place',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/places/{ip}',
                  'segments' => [
                    [
                      'lit' => 'places',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'places',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'plus' => [
          'fields' => [
            [
              'name' => 'anonymous',
              'title' => 'Anonymous',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'as',
              'title' => 'As',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'geo',
              'title' => 'Geo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'is_anonymous',
              'title' => 'Is Anonymous',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_anycast',
              'title' => 'Is Anycast',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_hosting',
              'title' => 'Is Hosting',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_mobile',
              'title' => 'Is Mobile',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_satellite',
              'title' => 'Is Satellite',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'mobile',
              'title' => 'Mobile',
              'type' => '`$OBJECT`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'plus',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/plus/{ip}',
                  'segments' => [
                    [
                      'lit' => 'plus',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'plus',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/plus/me',
                  'segments' => [
                    [
                      'lit' => 'plus',
                    ],
                    [
                      'lit' => 'me',
                    ],
                  ],
                  'parts' => [
                    'plus',
                    'me',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [
                    '$action' => 'me',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'privacy' => [
          'fields' => [
            [
              'name' => 'hosting',
              'title' => 'Hosting',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
            [
              'name' => 'proxy',
              'title' => 'Proxy',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
            [
              'name' => 'relay',
              'title' => 'Relay',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
            [
              'name' => 'service',
              'title' => 'Service',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'tor',
              'title' => 'Tor',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
            [
              'name' => 'vpn',
              'title' => 'Vpn',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
          ],
          'name' => 'privacy',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/privacy',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'privacy',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'privacy',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'privacy_extended' => [
          'fields' => [
            [
              'name' => 'census',
              'title' => 'Census',
              'type' => '`$BOOLEAN`',
              'short' => 'Ranges where we\'ve observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.',
            ],
            [
              'name' => 'census_ports',
              'title' => 'Census Ports',
              'type' => '`$ARRAY`',
              'short' => 'The ports we\'ve gotten positive results for when running our VPN detection census',
            ],
            [
              'name' => 'confidence',
              'title' => 'Confidence',
              'type' => '`$INTEGER`',
              'short' => 'The level of confidence attributed to the best source associated with this range.',
            ],
            [
              'name' => 'coverage',
              'title' => 'Coverage',
              'type' => '`$NUMBER`',
              'short' => 'For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.',
            ],
            [
              'name' => 'device_activity',
              'title' => 'Device Activity',
              'type' => '`$BOOLEAN`',
              'short' => 'Ranges on which we\'ve observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)',
            ],
            [
              'name' => 'first_seen',
              'title' => 'First Seen',
              'type' => '`$STRING`',
              'short' => 'Date when the activity on an anonymous IP address was first observed.',
              'format' => 'date',
            ],
            [
              'name' => 'hosting',
              'title' => 'Hosting',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates a hosting/cloud service/data center IP address',
            ],
            [
              'name' => 'inferred',
              'title' => 'Inferred',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs',
            ],
            [
              'name' => 'last_seen',
              'title' => 'Last Seen',
              'type' => '`$STRING`',
              'short' => 'Date when the activity on an anonymous IP address was last/recently observed.',
              'format' => 'date',
            ],
            [
              'name' => 'proxy',
              'title' => 'Proxy',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates an open web proxy IP address',
            ],
            [
              'name' => 'relay',
              'title' => 'Relay',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates a location-preserving anonymous relay service',
            ],
            [
              'name' => 'service',
              'title' => 'Service',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names',
            ],
            [
              'name' => 'tor',
              'title' => 'Tor',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates a Tor (The Onion Router) exit node IP address',
            ],
            [
              'name' => 'vpn',
              'title' => 'Vpn',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates Virtual Private Network (VPN) service exit node IP address',
            ],
            [
              'name' => 'vpn_config',
              'title' => 'Vpn Config',
              'type' => '`$BOOLEAN`',
              'short' => 'Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs',
            ],
            [
              'name' => 'whois',
              'title' => 'Whois',
              'type' => '`$BOOLEAN`',
              'short' => 'Ranges where we\'ve observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers',
            ],
          ],
          'name' => 'privacy_extended',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/privacy_extended',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'privacy_extended',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'privacy_extended',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.census_ports`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'range' => [
          'fields' => [
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'num_ranges',
              'title' => 'Num Ranges',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'ranges',
              'title' => 'Ranges',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'redirects_to',
              'title' => 'Redirects To',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'range',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ranges/{domain}',
                  'segments' => [
                    [
                      'lit' => 'ranges',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'ranges',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'domain' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'residential_proxy' => [
          'fields' => [
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The IPv4 or IPv6 address associated with a residential proxy',
            ],
            [
              'name' => 'last_seen',
              'title' => 'Last Seen',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)',
              'format' => 'date',
            ],
            [
              'name' => 'percent_days_seen',
              'title' => 'Percent Days Seen',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'The percentage of days the IP was active in the last 7-day period',
            ],
            [
              'name' => 'service',
              'title' => 'Service',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The name of the residential proxy service.',
            ],
          ],
          'name' => 'residential_proxy',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/resproxy',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'resproxy',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'resproxy',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'single' => [
          'fields' => [],
          'name' => 'single',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/city',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'city',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'city',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/country',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'country',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'country',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/hostname',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'hostname',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'hostname',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/ip',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'ip',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'ip',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/loc',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'loc',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'loc',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/org',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'org',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'org',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/postal',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'postal',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'postal',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/region',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'region',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'region',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}/timezone',
                  'segments' => [
                    [
                      'var' => 'ip',
                    ],
                    [
                      'lit' => 'timezone',
                    ],
                  ],
                  'parts' => [
                    '{ip}',
                    'timezone',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/city',
                  'segments' => [
                    [
                      'lit' => 'city',
                    ],
                  ],
                  'parts' => [
                    'city',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/country',
                  'segments' => [
                    [
                      'lit' => 'country',
                    ],
                  ],
                  'parts' => [
                    'country',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/hostname',
                  'segments' => [
                    [
                      'lit' => 'hostname',
                    ],
                  ],
                  'parts' => [
                    'hostname',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ip',
                  'segments' => [
                    [
                      'lit' => 'ip',
                    ],
                  ],
                  'parts' => [
                    'ip',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/loc',
                  'segments' => [
                    [
                      'lit' => 'loc',
                    ],
                  ],
                  'parts' => [
                    'loc',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/org',
                  'segments' => [
                    [
                      'lit' => 'org',
                    ],
                  ],
                  'parts' => [
                    'org',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/postal',
                  'segments' => [
                    [
                      'lit' => 'postal',
                    ],
                  ],
                  'parts' => [
                    'postal',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/region',
                  'segments' => [
                    [
                      'lit' => 'region',
                    ],
                  ],
                  'parts' => [
                    'region',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/timezone',
                  'segments' => [
                    [
                      'lit' => 'timezone',
                    ],
                  ],
                  'parts' => [
                    'timezone',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_asn' => [
          'fields' => [
            [
              'name' => 'abuse',
              'title' => 'Abuse',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'admin',
              'title' => 'Admin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'maintainer',
              'title' => 'Maintainer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'org',
              'title' => 'Org',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'range',
              'title' => 'Range',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'raw',
              'title' => 'Raw',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'title' => 'Source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tech',
              'title' => 'Tech',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated',
              'title' => 'Updated',
              'type' => '`$STRING`',
              'format' => 'date',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'whois_asn',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/net/AS{asn}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'net',
                    ],
                    [
                      'lit' => 'AS{asn}',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'net',
                    'AS{asn}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.records`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'asn',
                        'orig' => 'asn',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'asn',
                      'page',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_domain' => [
          'fields' => [
            [
              'name' => 'net',
              'title' => 'Net',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'whois_domain',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/net/{domain}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'net',
                    ],
                    [
                      'var' => 'domain',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'net',
                    '{domain}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                      'page',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_ip' => [
          'fields' => [
            [
              'name' => 'net',
              'title' => 'Net',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'whois_ip',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/net/{whoisip}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'net',
                    ],
                    [
                      'var' => 'whoisip',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'net',
                    '{whoisip}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'whoisip',
                        'orig' => 'whoisip',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'whoisip',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_net_id' => [
          'fields' => [
            [
              'name' => 'net',
              'title' => 'Net',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'whois_net_id',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/net/{whoisnetid}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'net',
                    ],
                    [
                      'var' => 'whoisnetid',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'net',
                    '{whoisnetid}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'whoisnetid',
                        'orig' => 'whoisnetid',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'whoisnetid',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_org' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'org',
              'title' => 'Org',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'whois_org',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/org/{whoisorgid}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'org',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'org',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'whoisorgid' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'whoisorgid',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'page',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whois_poc' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'poc',
              'title' => 'Poc',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'whois_poc',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois/poc/{whoispoc}',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                    [
                      'lit' => 'poc',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'whois',
                    'poc',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'whoispoc' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'whoispoc',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'whoissource',
                        'orig' => 'whoissource',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'page',
                      'whoissource',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IpinfoDeveloperFeatures::make_feature($name);
    }
}
