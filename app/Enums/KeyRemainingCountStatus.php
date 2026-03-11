<?php

namespace App\Enums;

enum KeyRemainingCountStatus: string
{
    case RECEIVED = 'received';
    case ERROR = 'error';
    case PENDING = 'pending';
}
