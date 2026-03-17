import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Article {
  title: string;
  summary: string;
  imageUrl: string;
  sourceUrl: string;
}

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  articles: Article[] = [
    {
      title: '10 actions pour réduire votre empreinte écologique',
      summary: 'La meilleure façon d’améliorer votre impact sur le climat est de réduire vos émissions. Voici nos 10 conseils pratiques pour faire une réelle différence au quotidien.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop',
      sourceUrl: 'https://ecotree.green/blog/10-actions-pour-reduire-votre-empreinte-ecologique'
    },
    {
      title: 'Nos gestes écologiques du quotidien ont-ils un impact réel ?',
      summary: 'Face à l’urgence climatique, on entend souvent dire que chaque geste compte. Mais quel est l’impact réel de nos actions individuelles sur la planète ?',
      imageUrl: 'https://images.unsplash.com/photo-1542601098-3ade3a4df59c?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://inextremis-antigaspi.fr/la-librairie/conseils_ecolos/nos-gestes-ecologies-du-quotidien-ont-ils-un-impact-reel/'
    },
    {
      title: 'Les petits gestes comptent-ils vraiment ?',
      summary: 'Le facteur humain est essentiel dans la lutte contre le réchauffement. Analyse de la portée des actions individuelles face aux enjeux globaux.',
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://www.lapresse.ca/actualites/environnement/2024-08-16/le-facteur-humain/les-petits-gestes-comptent-ils-vraiment.php'
    },
    {
      title: 'Les petits gestes individuels peuvent-ils sauver la planète ?',
      summary: 'Le débat est vif : les actions de chacun suffisent-elles ou faut-il une révolution systémique ? Un éclairage sur la complémentarité des approches.',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://ledrenche.fr/les-petits-gestes-individuels-peuvent-ils-sauver-la-planeteles-petits-gestes-individuels-peuvent-ils-sauver-la-planete/'
    },
    {
      title: 'Écologie : petits gestes sans grands effets ?',
      summary: 'Certains critiques pointent du bois : et si nos petits gestes détournaient l’attention des vrais coupables industriels ? Une réflexion nécessaire.',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2454&auto=format&fit=crop',
      sourceUrl: 'https://www.marianne.net/societe/ecologie-petits-gestes-sans-grands-effets'
    },
    {
      title: 'Comment réduire son empreinte carbone ?',
      summary: 'Guide complet pour comprendre et diminuer ses émissions de CO2. Du transport à l’alimentation, des solutions concrètes pour agir dès maintenant.',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://ecotoxicologie.fr/reduire-empreinte-carbone'
    },
    {
      title: 'Connaissez-vous votre empreinte climat ?',
      summary: 'L’ADEME vous propose de calculer votre impact réel. Une étape indispensable pour identifier ses principaux postes d’émission et agir efficacement.',
      imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2682&auto=format&fit=crop',
      sourceUrl: 'https://agirpourlatransition.ademe.fr/particuliers/evaluer-son-impact/calculer-empreinte-carbone/connaissez-vous-votre-empreinte-climat'
    },
    {
      title: '3 astuces pour réduire l’empreinte carbone de son entreprise',
      summary: 'Parce que les entreprises ont aussi un rôle majeur à jouer. Découvrez trois leviers simples pour engager votre structure dans la transition.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://globalclimateinitiatives.com/3-astuces-pour-reduire-lempreinte-carbone-de-son-entreprise/'
    },
    {
      title: '10 astuces et gestes pour réduire son empreinte carbone',
      summary: 'Des solutions ingénieuses pour optimiser sa consommation d’énergie et ses déchets sans pour autant sacrifier son confort de vie.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
      sourceUrl: 'https://www.code-climat.com/10-astuces-gestes-reduire-empreinte-carbone-climat.html'
    },
    {
      title: 'Sélection de médias sur l’écologie',
      summary: 'Pour aller plus loin, voici une sélection de blogs, podcasts et revues qui traitent des enjeux environnementaux avec profondeur et sérieux.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop',
      sourceUrl: 'https://www.lafabriquedescastors.com/blog/media-ecologie'
    }
  ];

  openArticle(url: string) {
    window.open(url, '_blank');
  }
}
