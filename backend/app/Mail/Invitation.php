<?php
 
namespace App\Mail;
 
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
 
class Invitation extends Mailable
{
    use Queueable, SerializesModels;
 
    public $invitation;

    public function __construct(array $invitation)
    {
        $this->invitation = $invitation;
    }

    public function build()
    {
        return $this->from('administrateur@chezmoi.com', 'Tunisie Telecom')
                    ->view('emails.invitation');
    }
}
