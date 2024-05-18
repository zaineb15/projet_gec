<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $confirmationCode;

    /**
     * Create a new message instance.
     *
     * @param  string  $confirmationCode
     * @return void
     */
    public function __construct($confirmationCode)
    {
        $this->confirmationCode = $confirmationCode;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('tunisie.telecom@email.com') // Adresse e-mail de l'expéditeur
                    ->view('emails.confirmation_code')
                    ->subject('Code de confirmation'); // Sujet de l'e-mail
    }
}
