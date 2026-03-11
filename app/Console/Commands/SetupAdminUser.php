<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

use function Laravel\Prompts\password;
use function Laravel\Prompts\text;

class SetupAdminUser extends Command
{
    protected $signature = 'app:setup-admin-user';

    protected $description = 'Create or update the admin user';

    public function handle(): void
    {
        $email = text(
            label: 'Admin email',
            placeholder: 'admin@example.com',
            required: true,
            validate: fn (string $value) => filter_var($value, FILTER_VALIDATE_EMAIL)
                ? null
                : 'Please enter a valid email address.',
        );

        $password = password(
            label: 'Admin password',
            required: true,
            validate: fn (string $value) => strlen($value) >= 8
                ? null
                : 'Password must be at least 8 characters.',
        );

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin',
                'password' => bcrypt($password),
                'is_admin' => true,
                'is_active' => true,
            ],
        );

        $action = $user->wasRecentlyCreated ? 'created' : 'updated';

        $this->info("Admin user {$action} successfully: {$email}");
    }
}
