package com.example.ElectricityBillSystem.Service;

import com.example.ElectricityBillSystem.Model.AppUser;
import com.example.ElectricityBillSystem.Repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GoogleOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final AppUserRepository appUserRepository;

    @Value("${app.security.google-admin-email:}")
    private String adminEmail;

    public GoogleOAuth2UserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User googleUser = new DefaultOAuth2UserService().loadUser(userRequest);
        Map<String, Object> attributes = googleUser.getAttributes();

        String email = String.valueOf(attributes.get("email"));
        String name = String.valueOf(attributes.getOrDefault("name", email));

        String role = (adminEmail != null && !adminEmail.isBlank() && email.equalsIgnoreCase(adminEmail.trim())) ? "ADMIN" : "USER";

        AppUser appUser = appUserRepository.findByEmailIgnoreCase(email).orElseGet(AppUser::new);
        appUser.setName(name);
        appUser.setEmail(email);
        appUser.setProvider("GOOGLE");
        appUser.setRole(role);
        appUserRepository.save(appUser);

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

        return new DefaultOAuth2User(authorities, attributes, "email");
    }
}
