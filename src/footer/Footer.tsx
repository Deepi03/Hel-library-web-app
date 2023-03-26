import LinkedInIcon from "@mui/icons-material/LinkedIn"

const fontIcons = [
  { icon: faLinkedin, href: "https://www.linkedin.com/in/deepika-rajasekar/" },
  { icon: faSafari, href: "https://deepiport.netlify.app/" },
  {
    icon: faGithub,
    href: "https://github.com/Deepi03"
  }
]

export const Footer = () => {
  return (
    <footer>
      <div aria-label="copyright" className="copyright">
        &copy; 2023 Deepika
      </div>
      <div>
        <ul aria-label="social media">
          {fontIcons.map((fontIcon) => (
            <li key={fontIcon.icon}>
              <a href={fontIcon.href}>
                <FontAwesomeIcon icon={fontIcon.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
