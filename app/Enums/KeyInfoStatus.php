<?php

namespace App\Enums;

enum KeyInfoStatus: string
{
    case RECEIVED = 'received';
    case ERROR = 'error';
    case PENDING = 'pending';
}
