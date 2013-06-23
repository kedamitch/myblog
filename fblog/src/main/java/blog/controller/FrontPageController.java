package blog.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/fontpage")
public class FrontPageController {
	
	@RequestMapping("index.html")
	public ModelAndView queryFrontPage(HttpServletRequest req, HttpServletResponse rsp) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("test", "test");
		
		
		
		mv.setViewName("index");
		return mv;
	}
	
	
	
	
	
}