# E-mails do Supabase Auth

Layout copiado do Paper (página "Email · Arquidiocese"). Cole cada arquivo em
**Supabase > Authentication > Emails**, no template de mesmo nome, com o assunto indicado.
Os de **Segurança** só saem se o aviso estiver ligado (toggle de cada um).

## Autenticação

| Template no Supabase | Arquivo | Assunto |
|---|---|---|
| Confirm sign up | `autenticacao/1-confirmar-cadastro.html` | `Confirme seu e-mail · Arquidiocese de Botucatu` |
| Invite user | `autenticacao/2-convite.html` | `Convite para o painel da Arquidiocese de Botucatu` |
| Magic link or OTP | `autenticacao/3-link-magico.html` | `Seu link de acesso · Arquidiocese de Botucatu` |
| Change email address | `autenticacao/4-alterar-email.html` | `Confirme a troca de e-mail · Arquidiocese de Botucatu` |
| Reset password | `autenticacao/5-redefinir-senha.html` | `Redefinir sua senha · Arquidiocese de Botucatu` |
| Reauthentication | `autenticacao/6-reautenticacao.html` | `{{ .Token }} é seu código de verificação` |

## Segurança

| Template no Supabase | Arquivo | Assunto |
|---|---|---|
| Password changed | `seguranca/1-senha-alterada.html` | `Sua senha foi alterada · Arquidiocese de Botucatu` |
| Email address changed | `seguranca/2-email-alterado.html` | `O e-mail da sua conta foi alterado · Arquidiocese de Botucatu` |
| Phone number changed | `seguranca/3-telefone-alterado.html` | `O telefone da sua conta foi alterado · Arquidiocese de Botucatu` |
| Sign-in method linked | `seguranca/4-metodo-login-vinculado.html` | `Novo método de login na sua conta · Arquidiocese de Botucatu` |
| Sign-in method removed | `seguranca/5-metodo-login-removido.html` | `Método de login removido da sua conta · Arquidiocese de Botucatu` |
| Verification method added | `seguranca/6-verificacao-adicionada.html` | `Verificação em duas etapas ativada · Arquidiocese de Botucatu` |
| Verification method removed | `seguranca/7-verificacao-removida.html` | `Verificação em duas etapas removida · Arquidiocese de Botucatu` |
